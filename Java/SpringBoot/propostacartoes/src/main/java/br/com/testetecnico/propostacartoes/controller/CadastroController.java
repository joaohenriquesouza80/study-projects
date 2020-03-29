package br.com.testetecnico.propostacartoes.controller;

import br.com.testetecnico.propostacartoes.domain.Cadastro;
import br.com.testetecnico.propostacartoes.exception.CadastroInternalErrorException;
import br.com.testetecnico.propostacartoes.exception.CadastroNotFoundException;
import br.com.testetecnico.propostacartoes.exception.CadastroPreConditionException;
import br.com.testetecnico.propostacartoes.repository.CadastrosRepository;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Controlador com regras de negócio de Cadastro
 * @author joao.souza
 */
@Service
public class CadastroController {

    private static final Logger LOG = LogManager.getLogger(CadastroController.class);

    @Autowired
    private CadastrosRepository cadastrosRepository;

    /**
     * Busca o cadastro completo de um determinado email
     * @param email Email que será consultado na base de dados
     * @return Cadastro completo do email consultado.
     * @exception CadastroNotFoundException Caso não encontre na base
     * @exception CadastroInternalErrorException Caso encontre mais de um email igual cadastrado (nao deve acontecer)
     */
    private Cadastro buscarCadastro(String email) {
        LOG.debug(String.format("Buscando cadastro com email: '%s'",email));

        List<Cadastro> listCadastro= cadastrosRepository.findByEmail(email.toLowerCase());

        if (listCadastro.size() > 1) {
            String errorMessageIds = "";
            for (Cadastro tempCadastro : listCadastro) {
                errorMessageIds = errorMessageIds.concat(" -> ".concat(tempCadastro.getId().toString()));
            }
            LOG.error(String.format("Existe mais de um cadastro com o email '%s'. IDs: %s",email,errorMessageIds));
            throw new CadastroInternalErrorException("Existe mais de um cadastro com o mesmo email. IDs" + errorMessageIds);
        } else if (listCadastro.size() <= 0) {
            LOG.error(String.format("Email '%s' nao encontrado no cadastro",email));
            throw new CadastroNotFoundException("Email: " + email.toLowerCase());
        }

        return listCadastro.get(0);
    }

    /**
     * Verifica se o Cadastro atual esta confirmado na base
     * @param cadastro É o cadastro que deverá ser analisado
     * @return True para quando o cadastro estiver confirmado e False para quando estiver pendente
     */
    private Boolean isCadastroConfirmado(Cadastro cadastro) {
        return ((cadastro.getCadastroConfirmado() != null) && (cadastro.getCadastroConfirmado() == Boolean.TRUE));
    }

    /**
     * Verifica se o Cadastro atual esta confirmado na base, porém dispara exceção se não estiver
     * Este metodo é executado antes de consultar, alterar e excluir um cadastro pois é premissa que isso só
     * ocorra se o mesmo estiver confirmado em banco
     * @param cadastro Valida se um cadastro esta confirmado porem dispara excecao se nao estiver
     * @exception CadastroPreConditionException Quando o cadastro estiver com a confirmação pendente
     */
    private void validarCadastroConfirmado(Cadastro cadastro) {
        LOG.debug(String.format("Verificando se cadastro do email '%s' foi confirmado",cadastro.getEmail()));
        if (! isCadastroConfirmado(cadastro)) {
            LOG.error(String.format("Cadastro do email '%s' esta pendente de confirmacao",cadastro.getEmail()));
            throw new CadastroPreConditionException("Cadastro pendente de confirmacao");
        }
    }

    /**
     * Consulta todos os cadastros do banco
     * @return Retorna todos os Cadastrados do banco de Dados (incluido na API para efeito de testes)
     */
    public List<Cadastro> consultarTodosCadastros() {
        LOG.debug("Buscando todos os cadastros");
        return cadastrosRepository.findAll();
    }

    /**
     * Consulta um cadastro especifico no banco informando um determinado email
     * @param email Email que será consultado na base de dados
     * @return
     */
    public Cadastro consultarCadastroPorEmail(String email) {
        LOG.debug(String.format("Consultando cadastro do email '%s'",email));
        Cadastro cadastro = buscarCadastro(email);
        validarCadastroConfirmado(cadastro);
        return cadastro;
    }

    /**
     * Salva o cadastro no banco de dados
     * @param cadastro Cadastro que deverá ser salvo no banco
     * @return Cadastro salvo no banco
     * @exception CadastroPreConditionException Quando o email já estiver salvo em banco
     */
    public Cadastro salvarCadastro(Cadastro cadastro) {
        cadastro.validarCadastro();

        LOG.debug(String.format("Salvando cadastro do email '%s'",cadastro.getEmail()));

        List<Cadastro> listCadastro= cadastrosRepository.findByEmail(cadastro.getEmail());
        if(listCadastro.size() == 0) {
            //Confirmacao so é feita através do método confirmarCadastro
            cadastro.setCadastroConfirmado(null);
            cadastro.setDataConfirmacao(null);

            return cadastrosRepository.save(cadastro);
        }
        LOG.error(String.format("Erro ao Salvar Email %s. Email já cadastrado",listCadastro.get(0).getEmail()));
        throw new CadastroPreConditionException("Email ja cadastrado para outro cadastro: " + listCadastro.get(0).getId());
    }

    /**
     * Apaga um cadastro de um determinado email
     * @param email Email que será analisado em banco
     */
    public void apagarCadastroPorEmail(String email) {
        Cadastro cadastro = buscarCadastro(email);
        validarCadastroConfirmado(cadastro);
        LOG.debug(String.format("Apagando cadastro do email %s",email));
        cadastrosRepository.delete(cadastro);
    }

    /**
     * Confirma um cadastro existente que ainda não foi confirmado
     * @param email Email que terá o cadastro confirmado
     * @return Cadastro que foi confirmado com sucesso
     * @exception CadastroPreConditionException Quando o Cadastro ja tiver sido confirmado
     */
    public Cadastro confirmarCadastro(String email) {
        Cadastro cadastro = buscarCadastro(email.toLowerCase());

        if (isCadastroConfirmado(cadastro)) {
            LOG.error(String.format("Cadastro do email %s ja esta confirmado",cadastro.getEmail()));
            throw new CadastroPreConditionException("Cadastro ja esta confirmado desde: " + cadastro.getDataConfirmacao());
        }

        cadastro.setCadastroConfirmado(Boolean.TRUE);
        cadastro.setDataConfirmacao(new Date());

        LOG.debug(String.format("Confirmando cadastro do email %s",cadastro.getEmail()));
        return cadastrosRepository.save(cadastro);
    }

    /**
     * Atualiza os dados de um determinado cadastro ja confirmado
     * @param cadastro Cadastro que sera atualizado
     * @return Cadastro atualizado
     */
    public Cadastro atualizarCadastro(Cadastro cadastro) {
        cadastro.validarCadastro();
        Cadastro cadastroBanco = buscarCadastro(cadastro.getEmail().toLowerCase());
        validarCadastroConfirmado(cadastroBanco);

        cadastro.setId(cadastroBanco.getId());
        cadastro.setCadastroConfirmado(cadastroBanco.getCadastroConfirmado());
        cadastro.setDataConfirmacao(cadastroBanco.getDataConfirmacao());

        LOG.debug(String.format("Atualizando cadastro do email %s",cadastro.getEmail()));
        return cadastrosRepository.save(cadastro);
    }
}
