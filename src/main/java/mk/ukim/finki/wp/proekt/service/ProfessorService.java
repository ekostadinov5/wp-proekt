package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Professor;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProfessorService {

    Professor createProfessor(String id, String title, String firstName, String lastName);

    Page<Professor> getAllProfessors(int page, int pageSize);

    List<Professor> searchProfessors(String term);

    Professor getProfessor(String id);

    Professor updateProfessor(String oldId, String id, String title, String firstName, String lastName);

    void deleteProfessor(String id);

}
