package br.com.testetecnico.propostacartoes.repository;

import br.com.testetecnico.propostacartoes.domain.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Interface para CRUD de cadastros
 * @author joao.souza
 */
public interface CadastrosRepository extends JpaRepository<Cadastro, Long> {

    List<Cadastro> findByEmail(String emailAddress);
}
