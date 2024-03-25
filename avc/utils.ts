import { ScriptableContext } from 'chart.js';

export function drawAnnotationBox(
  context: ScriptableContext<'line'>,
  // TODO: handle more 4 digits
  text: string,
  boxBgColor: string
) {
  const ctx = context.chart.ctx;
  const { x2: x } = (context as any).element;
  let { y } = (context as any).element;
  ctx.save();

  const borderRadius = 8,
    width = 51,
    height = 28;

  y = y - height / 2;

  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + width - borderRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + borderRadius);
  ctx.lineTo(x + width, y + height - borderRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - borderRadius,
    y + height
  );
  ctx.lineTo(x + borderRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.closePath();

  ctx.fillStyle = boxBgColor;
  ctx.fill();
  ctx.stroke();

  // Draw the text
  ctx.fillStyle = 'rgb(46, 48, 52)';
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const textX = x + width / 2;
  const textY = y + height / 2;

  ctx.fillText(text, textX, textY);

  ctx.restore();
  return true;
}

export const gradientBackground =
  (from = 'rgba(245, 130, 249, 0.2)', to = 'rgba(245, 130, 249, 0)') =>
  (context: ScriptableContext<'line'>) => {
    const ctx = context.chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    return gradient;
  };
