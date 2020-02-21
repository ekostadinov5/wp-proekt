package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Subject;
import mk.ukim.finki.wp.proekt.model.exceptions.DuplicateSubjectNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.DuplicateSubjectShortNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidSubjectIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaSubjectRepository;
import mk.ukim.finki.wp.proekt.service.SubjectService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {
    private final JpaSubjectRepository subjectRepository;
    private final JpaProfessorRepository professorRepository;

    public SubjectServiceImpl(JpaSubjectRepository subjectRepository, JpaProfessorRepository professorRepository) {
        this.subjectRepository = subjectRepository;
        this.professorRepository = professorRepository;
    }

    @Override
    public List<Subject> getAllSubjects() {
        return this.subjectRepository.findAll();
    }

    @Override
    public List<Subject> getAllSubjectsOrdered() {
        return this.subjectRepository.findAll(Sort.by("name"));
    }

    @Override
    public List<Subject> searchSubjects(String term) {
        return this.subjectRepository.searchSubjects(term);
    }

    @Override
    public Subject createSubject(String name, String shortName) {
        if(this.subjectRepository.findByName(name).isPresent()) {
            throw new DuplicateSubjectNameException();
        }
        if(this.subjectRepository.findByShortName(shortName).isPresent()) {
            throw new DuplicateSubjectShortNameException();
        }
        Subject subject = new Subject();
        subject.setName(name);
        subject.setShortName(shortName);
        return this.subjectRepository.save(subject);
    }

    @Override
    public Subject getSubject(Long id) {
        return this.subjectRepository.findById(id).orElseThrow(InvalidSubjectIdException::new);
    }

    @Override
    public Subject updateSubject(Long id, String name, String shortName) {
        Optional<Subject> temp;
        if((temp = this.subjectRepository.findByName(name)).isPresent() && !temp.get().getId().equals(id)) {
            throw new DuplicateSubjectNameException();
        }
        if((temp = this.subjectRepository.findByShortName(shortName)).isPresent() && !temp.get().getId().equals(id)) {
            throw new DuplicateSubjectShortNameException();
        }
        Subject subject = this.subjectRepository.findById(id).orElseThrow(InvalidSubjectIdException::new);
        subject.setName(name);
        subject.setShortName(shortName);
        return this.subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(Long id) {
        this.subjectRepository.deleteById(id);
    }

    @Override
    public List<Professor> getProfessors(Long id) {
        return this.subjectRepository.findProfessors(id);
    }

    @Override
    public void addProfessorToSubject(Long subjectId, String professorId) {
        Subject subject = this.subjectRepository.findById(subjectId).orElseThrow(InvalidSubjectIdException::new);
        Professor professor = this.professorRepository.findById(professorId)
                .orElseThrow(InvalidProfessorIdException::new);
        professor.getSubjects().add(subject);
        this.professorRepository.save(professor);
    }

    @Override
    @Transactional
    public void removeProfessorFromSubject(Long subjectId, String professorId) {
        Subject subject = this.subjectRepository.findById(subjectId).orElseThrow(InvalidSubjectIdException::new);
        Professor professor = this.professorRepository.findById(professorId)
                .orElseThrow(InvalidProfessorIdException::new);
        professor.getSubjects().remove(subject);
        this.professorRepository.save(professor);
    }


}
