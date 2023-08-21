import { serviceApi as api } from "./ServiceApi";

export const Teste = async (contact) => {
  try {
    await api.post("/contact&limit=1000", contact);
  } catch (err) {
    return err;
  }
};
