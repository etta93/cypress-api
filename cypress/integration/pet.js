const pet = require("../fixtures/pet.json")

let petPath = '/pet'

describe('I can create, edit, and delete pet in store', ()=>{
    it('should successfully create pet in store and able to retrieve created pet data in get pet', ()=> {
        cy.request({
            url: Cypress.env('baseUrl')+petPath,
            method: 'POST',
            body: {
                "id": pet.petDog.id,
                "category": {
                    "id": pet.petDog.category.id,
                    "name": pet.petDog.category.name
                },
                "name": pet.petDog.name,
                "photoUrls": pet.petDog.photoUrls,
                "tags": [
                    {
                    "id": pet.petDog.tags.id,
                    "name": pet.petDog.tags.name
                    }
                ],
                "status": pet.petDog.status
            },
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((res) => {
            expect(res).to.have.property('status',200);
            expect(res).to.have.property('statusText','OK');

            expect(res.body).to.have.property('id',pet.petDog.id);
            expect(res.body).to.have.property('category');
            expect(res.body.category).to.have.property('id', pet.petDog.category.id);
            expect(res.body.category).to.have.property('name', pet.petDog.category.name);
            expect(res.body).to.have.property('name',pet.petDog.name);
            expect(res.body).to.have.property('photoUrls');
            expect(res.body).to.have.property('tags');
            expect(res.body.tags[0]).to.have.property('id', pet.petDog.tags.id);
            expect(res.body.tags[0]).to.have.property('name', pet.petDog.tags.name);
            expect(res.body).to.have.property('status', pet.petDog.status);

            const createdPetId = res.body.id;
            return createdPetId;
        }).then((createdPetId)=>{
            cy.wait(6000);
            cy.log( "Get Inserted Pet ID:" +createdPetId);
            cy.request({
                url: Cypress.env('baseUrl')+petPath+'/'+createdPetId,
                method: 'GET'
            }).then((res) => {
                expect(res).to.have.property('status',200);
                expect(res).to.have.property('statusText','OK');

                expect(res.body).to.have.property('id',pet.petDog.id);
                expect(res.body).to.have.property('category');
                expect(res.body.category).to.have.property('id', pet.petDog.category.id);
                expect(res.body.category).to.have.property('name', pet.petDog.category.name);
                expect(res.body).to.have.property('name',pet.petDog.name);
                expect(res.body).to.have.property('photoUrls');
                expect(res.body).to.have.property('tags');
                expect(res.body.tags[0]).to.have.property('id', pet.petDog.tags.id);
                expect(res.body.tags[0]).to.have.property('name', pet.petDog.tags.name);
                expect(res.body).to.have.property('status', pet.petDog.status);
            });
        })
    })
    it('should successfully update pet in store and able to retrieve updated pet data in get pet', ()=> {
        cy.request({
            url: Cypress.env('baseUrl')+petPath,
            method: 'PUT',
            body: {
                "id": pet.petDog.id,
                "category": {
                    "id": pet.petCat.category.id,
                    "name": pet.petCat.category.name
                },
                "name": pet.petDog.name,
                "photoUrls": pet.petCat.photoUrls,
                "tags": [
                    {
                    "id": pet.petCat.tags.id,
                    "name": pet.petCat.tags.name
                    }
                ],
                "status": pet.petCat.status
            },
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
        }).then((res) => {
            expect(res).to.have.property('status',200);
            expect(res).to.have.property('statusText','OK');

            expect(res.body).to.have.property('id',pet.petDog.id);  
            expect(res.body).to.have.property('category');
            expect(res.body.category).to.have.property('id', pet.petCat.category.id);
            expect(res.body.category).to.have.property('name', pet.petCat.category.name);
            expect(res.body).to.have.property('name',pet.petDog.name);
            expect(res.body).to.have.property('photoUrls');
            expect(res.body).to.have.property('tags');
            expect(res.body.tags[0]).to.have.property('id', pet.petCat.tags.id);
            expect(res.body.tags[0]).to.have.property('name', pet.petCat.tags.name);
            expect(res.body).to.have.property('status', pet.petCat.status);

        }).then((res) => {
            cy.wait(6000);
            const updatedPetId = res.body.id;
            cy.log( "Get Updated Pet ID:" + updatedPetId);
            cy.request({
                url: Cypress.env('baseUrl')+petPath+'/'+updatedPetId,
                method: 'GET'
            }).then((res) => {
                expect(res).to.have.property('status',200);
                expect(res).to.have.property('statusText','OK');

                expect(res.body).to.have.property('id',pet.petDog.id);  
                expect(res.body).to.have.property('category');
                expect(res.body.category).to.have.property('id', pet.petCat.category.id);
                expect(res.body.category).to.have.property('name', pet.petCat.category.name);
                expect(res.body).to.have.property('name',pet.petDog.name);
                expect(res.body).to.have.property('photoUrls');
                expect(res.body).to.have.property('tags');
                expect(res.body.tags[0]).to.have.property('id', pet.petCat.tags.id);
                expect(res.body.tags[0]).to.have.property('name', pet.petCat.tags.name);
                expect(res.body).to.have.property('status', pet.petCat.status);
            });
        });
    });
    it('should successfully delete pet in store and not see pet data in get pet by id', ()=> {
        cy.request({
            url: Cypress.env('baseUrl')+petPath+'/'+pet.petDog.id,
            method: 'DELETE'
        }).then((res) => {
            expect(res).to.have.property('status',200);
            expect(res).to.have.property('statusText','OK');

            expect(res.body).to.have.property('code', 200);
            expect(res.body).to.have.property('type', "unknown");
            expect(res.body).to.have.property('message', "123");
        }).then((res)=>{
            cy.wait(6000);
            const deletedPetId = pet.petDog.id;
            cy.log( "Get Deleted Pet ID:" + deletedPetId);
            cy.request({
                url: Cypress.env('baseUrl')+petPath+'/'+pet.petDog.id,
                method: 'GET',
                failOnStatusCode: false
            }).then((res) => {
                expect(res).to.have.property('status',404);
                expect(res).to.have.property('statusText','Not Found');

                expect(res.body).to.have.property('code',1);
                expect(res.body).to.have.property('message',"Pet not found");
                expect(res.body).to.have.property('type',"error");
            });
        })
    })
});