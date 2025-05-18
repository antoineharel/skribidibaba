export interface DrawCircleParams {
  x: number;
  y: number;
  radius: number;
  fill: string;
}

export interface DrawLineParams {
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
  radius: number;
  fill: string;
}
