package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Subject;

import java.util.List;

public interface SubjectService {

    List<Subject> getAllSubjects();

    List<Subject> getAllSubjectsOrdered();

    List<Subject> searchSubjects(String term);

    Subject createSubject(String name, String shortName);

    Subject getSubject(Long id);

    Subject updateSubject(Long id, String name, String shortName);

    void deleteSubject(Long id);

    List<Professor> getProfessors(Long id);

    void addProfessorToSubject(Long subjectId, String professorId);

    void removeProfessorFromSubject(Long subjectId, String professorId);

}
