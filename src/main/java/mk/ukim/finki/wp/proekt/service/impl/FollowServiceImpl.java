package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidStudentIndexException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaStudentRepository;
import mk.ukim.finki.wp.proekt.service.FollowService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FollowServiceImpl implements FollowService {
    private final JpaStudentRepository studentRepository;
    private final JpaProfessorRepository professorRepository;

    public FollowServiceImpl(JpaStudentRepository studentRepository, JpaProfessorRepository professorRepository) {
        this.studentRepository = studentRepository;
        this.professorRepository = professorRepository;
    }

    @Override
    @Transactional
    public void follow(String studentIndex, String professorId) {
        Student student = this.studentRepository.findById(studentIndex).orElseThrow(InvalidStudentIndexException::new);
        Professor professor = this.professorRepository.findById(professorId).orElseThrow(InvalidProfessorIdException::new);
        student.getFollowing().add(professor);
        this.studentRepository.save(student);
    }

    @Override
    @Transactional
    public void unfollow(String studentIndex, String professorId) {
        Student student = this.studentRepository.findById(studentIndex).orElseThrow(InvalidStudentIndexException::new);
        Professor professor = this.professorRepository.findById(professorId).orElseThrow(InvalidProfessorIdException::new);
        student.getFollowing().remove(professor);
        this.studentRepository.save(student);
    }

}
