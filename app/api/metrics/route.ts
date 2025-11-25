import { NextResponse } from 'next/server';

import { buildSuccessResponse, buildErrorResponse } from '@/lib/http';
import { dailyMetricRepository } from '@/lib/repositories/dailyMetricRepository';
import { buildMetricSummary } from '@/lib/services/analyticsService';
import { getSessionUser } from '@/lib/session';
import { dailyMetricSchema } from '@/lib/validations';
import { ApiError, handleApiError } from '@/utils/error';

export async function GET() {
  try {
    const user = await getSessionUser();
    const metrics = await dailyMetricRepository.findRecentByUser(user.id);
    const summary = buildMetricSummary(metrics);

    return NextResponse.json(buildSuccessResponse({ metrics, summary }));
  } catch (error) {
    const apiError = handleApiError(error, 'Failed to fetch metrics');
    return NextResponse.json(buildErrorResponse(apiError.message), { status: apiError.statusCode });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();
    const body = await request.json();
    const parsed = dailyMetricSchema.safeParse(body);

    if (!parsed.success) {
      throw new ApiError('Invalid metric payload', 400, parsed.error.flatten());
    }

    const metric = await dailyMetricRepository.create(user.id, parsed.data);
    return NextResponse.json(buildSuccessResponse(metric, 'Metric created'), { status: 201 });
  } catch (error) {
    const apiError = handleApiError(error, 'Failed to create metric');
    return NextResponse.json(buildErrorResponse(apiError.message), { status: apiError.statusCode });
  }
}

