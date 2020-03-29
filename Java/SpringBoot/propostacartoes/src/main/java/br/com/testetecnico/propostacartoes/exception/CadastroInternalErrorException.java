package br.com.testetecnico.propostacartoes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception padrao para codigo 500
 * @author joao.souza
 */
@ResponseStatus(value= HttpStatus.INTERNAL_SERVER_ERROR)
public class CadastroInternalErrorException extends RuntimeException{

    public CadastroInternalErrorException(String message) {
        super(String.format("Erro interno : '%s'",message));
    }
}
