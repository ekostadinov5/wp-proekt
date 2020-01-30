package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidStudentIndexException;
import mk.ukim.finki.wp.proekt.repository.JpaStudentRepository;
import mk.ukim.finki.wp.proekt.service.StudentService;
import org.springframework.stereotype.Service;

@Service
public class StudentServiceImpl implements StudentService {
    private final JpaStudentRepository studentRepository;

    public StudentServiceImpl(JpaStudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(String index, String firstName, String lastName) {
        Student student = new Student();
        student.setIndex(index);
        student.setFirstName(firstName);
        student.setLastName(lastName);
        return this.studentRepository.save(student);
    }

    @Override
    public Student getStudent(String index) {
        return this.studentRepository.findById(index).orElseThrow(InvalidStudentIndexException::new);
    }

    @Override
    public Student updateStudent(String oldIndex, String index, String firstName, String lastName) {
        Student student = this.studentRepository.findById(oldIndex).orElseThrow(InvalidStudentIndexException::new);
        student.setIndex(index);
        student.setFirstName(firstName);
        student.setLastName(lastName);
        return this.studentRepository.save(student);
    }

    @Override
    public void deleteStudent(String index) {
        this.studentRepository.deleteById(index);
    }

}
