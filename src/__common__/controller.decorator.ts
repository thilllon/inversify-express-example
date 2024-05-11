export function ControllerDecorator(path: string) {
  return function (target: any) {
    Reflect.defineMetadata('path', path, target);
  };
}
