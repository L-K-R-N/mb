import { type TypedUseSelectorHook, useSelector } from "react-redux";

import type { RootState } from "@/shared/model/types";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
