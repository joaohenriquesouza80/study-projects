package br.com.testetecnico.propostacartoes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception padrao para codigo 412
 * @author joao.souza
 */
@ResponseStatus(value= HttpStatus.PRECONDITION_FAILED)
public class CadastroPreConditionException extends RuntimeException{

    public CadastroPreConditionException(String message) {
        super(String.format("Pre-Condicao nao foi atendida : '%s'",message));
    }
}
