package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.service.ProfessorService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorServiceImpl implements ProfessorService {
    private final JpaProfessorRepository professorRepository;

    public ProfessorServiceImpl(JpaProfessorRepository professorRepository) {
        this.professorRepository = professorRepository;
    }

    @Override
    public Professor createProfessor(String id, String title, String firstName, String lastName) {
        Professor professor = new Professor();
        professor.setId(id);
        professor.setTitle(title);
        professor.setFirstName(firstName);
        professor.setLastName(lastName);
        return this.professorRepository.save(professor);
    }

    @Override
    public Page<Professor> getAllProfessors(int page, int pageSize) {
        return this.professorRepository.findAll(PageRequest.of(page, pageSize));
    }

    @Override
    public List<Professor> searchProfessors(String term) {
        return this.professorRepository.searchProfessors(term);
    }

    @Override
    public Professor getProfessor(String id) {
        return this.professorRepository.findById(id).orElseThrow(InvalidProfessorIdException::new);
    }

    @Override
    public Professor updateProfessor(String oldId, String id, String title, String firstName, String lastName) {
        Professor professor = this.professorRepository.findById(oldId).orElseThrow(InvalidProfessorIdException::new);
        professor.setId(id);
        professor.setTitle(title);
        professor.setFirstName(firstName);
        professor.setLastName(lastName);
        return this.professorRepository.save(professor);
    }

    @Override
    public void deleteProfessor(String id) {
        this.professorRepository.deleteById(id);
    }

}
