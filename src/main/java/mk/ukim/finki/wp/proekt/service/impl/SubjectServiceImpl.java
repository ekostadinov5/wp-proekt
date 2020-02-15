package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Subject;
import mk.ukim.finki.wp.proekt.model.exceptions.DuplicateSubjectNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidSubjectIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaSubjectRepository;
import mk.ukim.finki.wp.proekt.service.SubjectService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectServiceImpl implements SubjectService {
    private final JpaSubjectRepository subjectRepository;

    public SubjectServiceImpl(JpaSubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
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
    public Subject createSubject(String name, String shortName) {
        if(this.subjectRepository.findByName(name).isPresent()) {
            throw new DuplicateSubjectNameException();
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
        Subject subject = this.subjectRepository.findById(id).orElseThrow(InvalidSubjectIdException::new);
        subject.setName(name);
        subject.setShortName(shortName);
        return this.subjectRepository.save(subject);
    }

    @Override
    public void deleteSubject(Long id) {
        this.subjectRepository.deleteById(id);
    }

}
