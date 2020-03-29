package br.com.testetecnico.propostacartoes.domain.common;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Classe Modal Comum de Identificaddor (ID) que pode ser utilizada em outros modais
 * @author joao.souza
 */
@MappedSuperclass
public class Identificador {

    @Id
    @GeneratedValue
    private Long id;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
}
