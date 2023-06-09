const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { users } = require('../../../database/models');
const registerService = require('../../../api/services/registerService');
const { createUserMockReturn, userMock, userTokenMock } = require('../../mocks/userMock');
const jwtServices = require('../../../api/auth/token');

describe('Register Service', () => {
  const { name, email, password } = createUserMockReturn.dataValues;
  describe('quando cria um usuário', () => {
    describe('e tem sucesso', () => {
      before(() => {
        sinon.stub(users, 'create').resolves(createUserMockReturn);
        sinon.stub(users, 'findOne').resolves(null);
        sinon.stub(jwtServices, 'generateToken').returns(userTokenMock);
      });
      after(() => {
        sinon.restore();
      });

      it('retorna um objeto', async () => {
        const newUser = await registerService.createRegister(name, email ,password);
        
        expect(newUser).to.be.an('object');
      });

      it('retorna um objeto com as chaves "status" e "json"', async () => {
        const newUser = await registerService.createRegister(name, email ,password);

        expect(newUser).to.have.all.keys('status', 'json');
      });

      it('retorna status 201 e um objeto json com os dados do usuario', async () => {
        const newUser = await registerService.createRegister(name, email ,password);


        expect(newUser.json).to.have.all.keys('id', 'name', 'email', 'password', 'role', 'userToken');
        expect(newUser.json.userToken).to.be.eq(userTokenMock);
        expect(newUser.json.id).to.be.eq(5);
        expect(newUser.json.name).to.be.eq('Batatinha');
        expect(newUser.json.email).to.be.eq('batatinha@hotmail.com');
        expect(newUser.json.password).to.be.eq('f9104c649c25423a30e2968573899f48');
        expect(newUser.json.role).to.be.eq('customer');
        expect(newUser.status).to.be.eq(201);
      });
    });

    describe('quando falha', () => {

      it('retorna um objeto com as chaves "status" e "json" contendo a chave "message"', async () => {
        const newUser = await registerService.createRegister('', email ,password);
        
        expect(newUser).to.be.an('object');
        expect(newUser).to.be.have.all.keys('status', 'json');
      })
    
      it('retorna um Erro com status 400 e mensagem "Algum campo está vazio"', async () => {
        const newUser = await registerService.createRegister('', email ,password);

        expect(newUser.status).to.be.eq(400);
        expect(newUser.json.message).to.be.eq('Algum campo está vazio');
      });

      it('retorna um Erro com status 409 e mensagem "Usuário já cadastrado"', async () => {
        sinon.stub(users, 'findOne').resolves(userMock);
        const newUser = await registerService.createRegister(userMock.name, userMock.email , userMock.password);
        
        expect(newUser.status).to.be.eq(409);
        expect(newUser.json.message).to.be.eq('Usuário já cadastrado');
        sinon.restore();
      });
    })
   })
});