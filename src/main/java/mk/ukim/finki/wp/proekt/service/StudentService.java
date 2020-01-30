package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Student;

public interface StudentService {

    Student createStudent(String index, String firstName, String lastName);

    Student getStudent(String index);

    Student updateStudent(String oldIndex, String index, String firstName, String lastName);

    void deleteStudent(String index);

}
