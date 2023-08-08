import bcrypt from 'bcryptjs';
import prisma from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req) {

    try {

        const body = await req.json();

        const { email, password, name, confirmPassword, role = 'CLIENT' } = body;

        if (!email || !password || !name) {
            return NextResponse.json({ error: 'Datos incorrectos, prueba de nuevo' }, { status: 400 })
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: 'Las contraseñas no coinciden' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                confirmPassword: '', //TODO: not sure if we should store this
                role,
            },
        });

        // create a new artist profile for the user and link it
        if (role === 'ARTIST') {
            await prisma.artistProfile.create({
                data: {
                    user:
                        { connect: { id: user.id } }
                }
            })
        }

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR');
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
