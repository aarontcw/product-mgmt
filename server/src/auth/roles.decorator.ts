import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: ('ADMIN'|'CUSTOMER')[]) => SetMetadata('roles', roles);