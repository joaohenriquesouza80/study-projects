package br.com.testetecnico.propostacartoes.resource;

import br.com.testetecnico.propostacartoes.domain.Cadastro;
import br.com.testetecnico.propostacartoes.controller.CadastroController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;

/**
 * Métodos publicados para Cadastros
 * @author joao.souza
 */
@RestController
public class CadastroResource {

    private final String PATH = "/cadastro";

    @Autowired
    private CadastroController cadastroController;

    /**
     * Método GET para consulta todos os cadastros
     * @return Lista de cadastros no Banco de Dados
     */
    @GetMapping(PATH)
    public List<Cadastro> getAll() {
        return cadastroController.consultarTodosCadastros();
    }

    /**
     * Método GET para consulta de um email específico com cadastro já confirmado em banco
     * @param email Email que será consultado
     * @return Cadastro do email informado
     */
    @GetMapping(PATH + "/{email}")
    public Cadastro getCadastro(@PathVariable String email) {
        return cadastroController.consultarCadastroPorEmail(email);
    }

    /**
     * Método POST para cadastrar um novo CADASTRO
     * @param cadastro Entidade Cadastro que deseja salvar em banco
     * @return Resultado do Request contendo Cadastro Salvo e location de consulta
     */
    @PostMapping(PATH)
    public ResponseEntity<Object> postCadastro(@RequestBody Cadastro cadastro) {
        Cadastro cadastroSalvo = cadastroController.salvarCadastro(cadastro);
        return ResponseEntity
                .created(ServletUriComponentsBuilder.fromCurrentRequest().path("/{email}").buildAndExpand(cadastro.getEmail()).toUri())
                .body(cadastro);
    }

    /**
     * Método POST para confirmar um cadastro já existente
     * @param email Email que tera o cadastro confirmado
     * @return Resultado do Request contendo Cadastro Confirmado e location de consulta
     */
    @PostMapping(PATH + "/{email}")
    public ResponseEntity<Object> postConfirmCadastro(@PathVariable String email) {
        Cadastro cadastroSalvo = cadastroController.confirmarCadastro(email);
        return ResponseEntity
                .created(ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri())
                .body(cadastroSalvo);
    }

    /**
     * Método DELETE que excluirá um cadastro já confirmado em banco
     * @param email Email que deseja exluir
     */
    @DeleteMapping(PATH + "/{email}")
    public void deleteCadastroByEmail(@PathVariable String email) {
        cadastroController.apagarCadastroPorEmail(email);
    }

    /**
     * Método PUT que irá atualizar um cadastro já confirmado em banco
     * @param cadastro Cadastro que deseja atualizar. A base será o email informado
     * @return Resultado do Request contendo Cadastro Atualizado e location de consulta
     */
    @PutMapping(PATH)
    public ResponseEntity<Object> updateCadastro(@RequestBody Cadastro cadastro) {
        Cadastro cadastroSalvo = cadastroController.atualizarCadastro(cadastro);
        return ResponseEntity.accepted().body(cadastroSalvo);
    }
}
