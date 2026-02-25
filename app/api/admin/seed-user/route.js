import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/server/lib/db"; 

export async function GET() {
  try {
    const username = "darlin";
    const email = "darlinlvaldez@gmail.com";
    const password = "darlin";
    const role = "superadmin";

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    return NextResponse.json({
      message: "Usuario admin creado correctamente"
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando usuario" },
      { status: 500 }
    );
  }
}