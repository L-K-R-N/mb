import type { ReactNode } from "react";

import type { TUserRole } from "@/entities/user/model/types";

export interface IRouteSchema {
   path?: string;
   defaultParams?: string;
   element?: ReactNode;
   name?: string;
   icon?: ReactNode;
   inMenu?: boolean;
   parent?: string;
   availableForRoles: TUserRole[];
}
