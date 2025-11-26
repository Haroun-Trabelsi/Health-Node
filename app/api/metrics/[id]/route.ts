import { NextRequest, NextResponse } from 'next/server';

import { buildErrorResponse, buildSuccessResponse } from '@/lib/http';
import { dailyMetricRepository } from '@/lib/repositories/dailyMetricRepository';
import { getSessionUser } from '@/lib/session';
import { dailyMetricSchema, objectIdSchema } from '@/lib/validations';
import { ApiError, handleApiError } from '@/utils/error';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const resolveParams = async (params: RouteParams['params']) => {
  const resolved = await params;
  return objectIdSchema.parse(resolved.id);
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    const metricId = await resolveParams(params);
    const metric = await dailyMetricRepository.findById(metricId, user.id);

    if (!metric) {
      throw new ApiError('Metric not found', 404);
    }

    return NextResponse.json(buildSuccessResponse(metric));
  } catch (error) {
    const apiError = handleApiError(error, 'Failed to fetch metric');
    return NextResponse.json(buildErrorResponse(apiError.message), { status: apiError.statusCode });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    const metricId = await resolveParams(params);
    const body = await request.json();
    const parsed = dailyMetricSchema.partial().safeParse(body);

    if (!parsed.success) {
      throw new ApiError('Invalid metric payload', 400, parsed.error.flatten());
    }

    const updated = await dailyMetricRepository.update(metricId, user.id, parsed.data);

    if (!updated) {
      throw new ApiError('Metric not found', 404);
    }

    return NextResponse.json(buildSuccessResponse(updated, 'Metric updated'));
  } catch (error) {
    const apiError = handleApiError(error, 'Failed to update metric');
    return NextResponse.json(buildErrorResponse(apiError.message), { status: apiError.statusCode });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getSessionUser();
    const metricId = await resolveParams(params);

    const deleted = await dailyMetricRepository.remove(metricId, user.id);

    if (!deleted) {
      throw new ApiError('Metric not found', 404);
    }

    return NextResponse.json(buildSuccessResponse(null, 'Metric deleted'));
  } catch (error) {
    const apiError = handleApiError(error, 'Failed to delete metric');
    return NextResponse.json(buildErrorResponse(apiError.message), { status: apiError.statusCode });
  }
}

