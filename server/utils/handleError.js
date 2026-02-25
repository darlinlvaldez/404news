export function handleError(error) {
  let status = 500;

  if (error.message === "UNAUTHORIZED") status = 401;
  else if (error.message === "FORBIDDEN") status = 403;
  else if (error.message === "Invalid ID") status = 400;

  return NextResponse.json(
    { error: error.message },
    { status }
  );
}