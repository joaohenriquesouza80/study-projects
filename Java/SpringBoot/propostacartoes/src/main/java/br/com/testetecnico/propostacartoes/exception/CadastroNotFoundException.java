package br.com.testetecnico.propostacartoes.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception padrao para codigo 404
 * @author joao.souza
 */
@ResponseStatus(value= HttpStatus.NOT_FOUND)
public class CadastroNotFoundException extends RuntimeException{

    public CadastroNotFoundException(String message) {
        super(String.format("Cadastro nao Encontrado : '%s'",message));
    }
}
