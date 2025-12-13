import { http, HttpResponse } from "msw";

export const userHandlers = [
   http.get("/api/users", () => {
      return HttpResponse.json([{ id: 1, name: "John Doe" }]);
   }),
   http.post("/api/users", async () => {
      return HttpResponse.json({ id: 1, name: "John Doe" }, { status: 201 });
   }),
];
