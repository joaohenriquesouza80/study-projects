package br.com.testetecnico.propostacartoes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception padrao para codigo 417
 * @author joao.souza
 */
@ResponseStatus(value= HttpStatus.EXPECTATION_FAILED)
public class CadastroExpectationFailedException extends RuntimeException{

    public CadastroExpectationFailedException(String message) {
        super(String.format("Campo obrigatório não informado : '%s'",message));
    }
}
