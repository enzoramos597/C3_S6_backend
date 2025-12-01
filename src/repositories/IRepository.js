export default class IRepository {
  constructor() {
    if (new.target === IRepository) {
      throw new Error("❌ IRepository es una clase abstracta y no puede instanciarse directamente");
    }
  }

  async obtenerPorId(id) {
    throw new Error("❌ Método 'obtenerPorId' debe ser implementado");
  }

  async obtenerTodos() {
    throw new Error("❌ Método 'obtenerTodos' debe ser implementado");
  }

  async agregar(data) {
    throw new Error("❌ Método 'agregar' debe ser implementado");
  }

  async actualizar(id, data) {
    throw new Error("❌ Método 'actualizar' debe ser implementado");
  }

  async eliminar(id) {
    throw new Error("❌ Método 'eliminar' debe ser implementado");
  }
}
