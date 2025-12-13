import { useDispatch } from "react-redux";

import type { AppDispatch } from "@/shared/model/types";

export const useAppDispatch: () => AppDispatch = useDispatch;
