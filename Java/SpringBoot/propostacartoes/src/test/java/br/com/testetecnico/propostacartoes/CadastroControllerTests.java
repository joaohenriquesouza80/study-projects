package br.com.testetecnico.propostacartoes;

import br.com.testetecnico.propostacartoes.controller.CadastroController;
import br.com.testetecnico.propostacartoes.domain.Cadastro;
import br.com.testetecnico.propostacartoes.domain.common.Endereco;
import br.com.testetecnico.propostacartoes.exception.CadastroExpectationFailedException;
import br.com.testetecnico.propostacartoes.exception.CadastroPreConditionException;
import br.com.testetecnico.propostacartoes.repository.CadastrosRepository;

import org.junit.After;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CadastroControllerTests {

    private static Cadastro cadastroMock = new Cadastro();
    private static Cadastro cadastroMockSalvo = new Cadastro();
    private static Endereco enderecoMock = new Endereco();

    @MockBean
    private CadastrosRepository cadastrosRepositoryMock;

    @Autowired
    private CadastroController cadastroController;

    private static void setCadastroMock() {
        cadastroMock.setNome("Teste");
        cadastroMock.setEmail("teste@teste.com.br");
        cadastroMock.setTelefone("551124212715");
        enderecoMock.setBairro("bairro");
        enderecoMock.setCep("12345678");
        enderecoMock.setCidade("cidade");
        enderecoMock.setEstado("SP");
        enderecoMock.setRua("rua");
        enderecoMock.setNumero(100);
        cadastroMock.setEndereco(enderecoMock);

        cadastroMockSalvo = cadastroMock;
        cadastroMockSalvo.setId(1L);
        cadastroMockSalvo.setCadastroConfirmado(Boolean.FALSE);
    }

    @BeforeClass
    public static void beforeClassTest() {
        setCadastroMock();
    }

    @After
    public void after() {
        setCadastroMock();
    }

    @Test(expected = CadastroPreConditionException.class)
    public void testeErroEmailJaCadastrado() {
        List<Cadastro> listCadastroMock = new ArrayList<Cadastro>();
        listCadastroMock.add(cadastroMock);
        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(listCadastroMock);

        cadastroController.salvarCadastro(cadastroMock);
    }

    @Test
    public void testeCadastroComSucesso() {
        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(new ArrayList<Cadastro>());
        when(cadastrosRepositoryMock.save(cadastroMock)).thenReturn(cadastroMockSalvo);

        assertEquals(cadastroMockSalvo, cadastroController.salvarCadastro(cadastroMock));
    }

    @Test(expected = CadastroExpectationFailedException.class)
    public void testeErroCadastroSemTelefonePreenchido() {
        Cadastro cadastroMockSemTelefone = cadastroMock;
        cadastroMockSemTelefone.setTelefone(null);

        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(new ArrayList<Cadastro>());
        cadastroController.salvarCadastro(cadastroMockSemTelefone);
    }

    @Test(expected = CadastroExpectationFailedException.class)
    public void testeErroCadastroComTelefoneEmBranco() {
        Cadastro cadastroMockTelefoneEmBranco = cadastroMock;
        cadastroMockTelefoneEmBranco.setTelefone("");

        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(new ArrayList<Cadastro>());
        cadastroController.salvarCadastro(cadastroMockTelefoneEmBranco);
    }

    @Test(expected = CadastroExpectationFailedException.class)
    public void testeErroCadastroSemEnderecoPreenchido() {
        Cadastro cadastroMockSemEndereco = cadastroMock;
        cadastroMockSemEndereco.setEndereco(null);

        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(new ArrayList<Cadastro>());
        cadastroController.salvarCadastro(cadastroMockSemEndereco);
    }

    @Test(expected = CadastroPreConditionException.class)
    public void testeErroConsultaComCadastroPendente() {
        List<Cadastro> listCadastroMockSalvo = new ArrayList<Cadastro>();
        listCadastroMockSalvo.add(cadastroMockSalvo);

        when(cadastrosRepositoryMock.findByEmail(cadastroMockSalvo.getEmail())).thenReturn(listCadastroMockSalvo);
        cadastroController.consultarCadastroPorEmail(cadastroMockSalvo.getEmail());
    }

    @Test
    public void testeConsultaComSucesso() {
        List<Cadastro> listCadastroMockSalvo = new ArrayList<Cadastro>();
        listCadastroMockSalvo.add(cadastroMockSalvo);
        listCadastroMockSalvo.get(0).setCadastroConfirmado(Boolean.TRUE);

        when(cadastrosRepositoryMock.findByEmail(cadastroMock.getEmail())).thenReturn(listCadastroMockSalvo);
        assertEquals(cadastroMockSalvo, cadastroController.consultarCadastroPorEmail(cadastroMock.getEmail()));
    }

    @Test(expected = CadastroPreConditionException.class)
    public void testeErroAlteracaoComCadastroPendente() {
        List<Cadastro> listCadastroMockSalvo = new ArrayList<Cadastro>();
        listCadastroMockSalvo.add(cadastroMockSalvo);

        when(cadastrosRepositoryMock.findByEmail(cadastroMockSalvo.getEmail())).thenReturn(listCadastroMockSalvo);
        cadastroController.atualizarCadastro(cadastroMockSalvo);
    }

    @Test(expected = CadastroPreConditionException.class)
    public void testeErroExclusaoComCadastroPendente() {
        List<Cadastro> listCadastroMockSalvo = new ArrayList<Cadastro>();
        listCadastroMockSalvo.add(cadastroMockSalvo);

        when(cadastrosRepositoryMock.findByEmail(cadastroMockSalvo.getEmail())).thenReturn(listCadastroMockSalvo);
        cadastroController.apagarCadastroPorEmail(cadastroMockSalvo.getEmail());
    }

}
