export function drawSnowflake1(ctx, x, y, size) {
    for (let i = 0; i < 6; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + size * Math.cos((i * Math.PI) / 3),
            y + size * Math.sin((i * Math.PI) / 3)
        );
    }
}

export function drawSnowflake2(ctx, x, y, size) {
    for (let i = 0; i < 8; i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(
            x + size * Math.cos((i * Math.PI) / 4),
            y + size * Math.sin((i * Math.PI) / 4)
        );
    }
}
