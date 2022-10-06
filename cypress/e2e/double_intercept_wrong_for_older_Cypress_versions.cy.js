describe("Testing error handling", () => {
  it("should show an error message if response not Ok and a received content otherwise", () => {
    cy.visit("http://localhost:3000");

    cy.intercept("http://localhost:3000/test_data", (request) => {
      request.reply({
        statusCode: 500,
        body: {
          message: "",
        },
        delay: 10,
      });
    });
    cy.get("#fetch_button").click();
    cy.get("#message").contains("Something went wrong!");
    cy.get("#ok_button").click();

    cy.intercept("http://localhost:3000/test_data", (request) => {
      request.reply({
        statusCode: 200,
        body: {
          message: "Some message from the stub",
        },
        delay: 10,
      });
    });
    cy.get("#fetch_button").click();
    cy.get("#message").contains("Some message from the stub");
  });
});
