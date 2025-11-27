import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/db';
// import { Collection } from 'mongodb'; // Optional: import Collection type if using native driver methods

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const connection = await connectToDatabase();

    const db = connection?.connection?.db;

    if (!db) {
      console.error('Database connection successful, but native DB object is unavailable.');
      return NextResponse.json({ message: 'Database initialization failed.' }, { status: 500 });
    }
    const usersCollection = db.collection('users'); 

    const existingUser = await usersCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      passwordHash: hashedPassword,
      provider: "credentials",   
      goals: [
        "Sleep 7h",
        "Drink 3L water"
      ],                 
      preferences: {            
        unitSystem: "metric",
        notificationsEnabled: true,
        focusAreas: [],            
      },
      createdAt: new Date(),
      __v: 0,
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Internal server error during registration' }, { status: 500 });
  }
}