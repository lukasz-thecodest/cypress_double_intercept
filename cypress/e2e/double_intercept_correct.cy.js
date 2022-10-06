describe("Testing error handling", () => {
  it("should show an error message if response not Ok and a received content otherwise", () => {
    cy.visit("http://localhost:3000");

    let requestCounter = 0;
    let response;

    cy.intercept("http://localhost:3000/test_data", (request) => {
      requestCounter = requestCounter + 1;
      if (requestCounter === 1) {
        response = {
          statusCode: 501,
          body: {
            message: "",
          },
          delay: 10,
        };
      } else {
        response = {
          statusCode: 200,
          body: {
            message: "Some message from the stub",
          },
          delay: 10,
        };
      }
      request.reply(response);
    });

    cy.get("#fetch_button").click();
    cy.get("#message").contains("Something went wrong!");
    cy.get("#ok_button").click();
    cy.get("#fetch_button").click();
    cy.get("#message").contains("Some message from the stub");
  });
});
