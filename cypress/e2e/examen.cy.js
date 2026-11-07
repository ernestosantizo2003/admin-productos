describe("Examen final - Admin de Productos", () => {

  beforeEach(() => {
    // Partir siempre de cero: se limpia el almacenamiento antes de cargar la
    // pagina, asi se cargan los 4 productos semilla del CSV.
    cy.visit("/", { onBeforeLoad(win) { win.localStorage.clear() } })
  })

  // Iniciar sesion en la aplicacion
  function iniciarSesion() {
    cy.get("#usuario").type("admin")
    cy.get("#clave").type("1234")
    cy.get("#btn-login").click()
  }

  // Tarea 1: iniciar sesion y verificar que el panel sea visible
  it("Inicia sesion y el panel de administracion es visible", () => {
    iniciarSesion()
    cy.get("#admin").should("be.visible")
  })

  // Tarea 2: agregar un producto y verificar que aparezca en la tabla
  it("Agrega un producto y aparece en la tabla", () => {
    iniciarSesion()
    cy.get("#nombre").type("Webcam")
    cy.get("#precio").type("250")
    cy.get("#stock").type("8")
    cy.get("#btn-guardar").click()
    cy.get(".fila-producto").should("have.length", 5)
    cy.get("#tabla-productos tbody").should("contain", "Webcam")
  })

  // Tarea 3: la validacion no permite agregar un producto con precio 0
  it("No permite agregar un producto con precio 0", () => {
    iniciarSesion()
    cy.get("#nombre").type("Invalido")
    cy.get("#precio").type("0")
    cy.get("#stock").type("5")
    cy.get("#btn-guardar").click()
    cy.get("#form-msg").should("contain", "precio")
    cy.get(".fila-producto").should("have.length", 4)   // no se agrego
    cy.get("#tabla-productos tbody").should("not.contain", "Invalido")
  })

})
