export class UserDto {
  success: Boolean;
  data: string;

  constructor(success: Boolean, data: string) {
    this.success = success;
    this.data = data;
  }
}
