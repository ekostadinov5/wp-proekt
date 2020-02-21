package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Subject;
import mk.ukim.finki.wp.proekt.service.SubjectService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/subjects", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class SubjectApi {
    private final SubjectService subjectService;

    public SubjectApi(SubjectService subjectService) {
        this.subjectService = subjectService;
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return this.subjectService.getAllSubjects();
    }

    @GetMapping("/ordered")
    public List<Subject> getAllSubjectsOrdered() {
        return this.subjectService.getAllSubjectsOrdered();
    }

    @GetMapping(params = "term")
    public List<Subject> searchSubjects(@RequestParam String term) {
        return this.subjectService.searchSubjects(term);
    }

    @GetMapping("/{id}")
    public Subject getSubject(@PathVariable Long id) {
        return this.subjectService.getSubject(id);
    }

    @PostMapping
    public Subject createSubject(@RequestParam String name,
                                 @RequestParam String shortName,
                                 HttpServletResponse response,
                                 UriComponentsBuilder builder) {
        Subject subject = this.subjectService.createSubject(name, shortName);
        response.setHeader("Location", builder
                .path("/api/subjects/{id}")
                .buildAndExpand(subject.getId())
                .toUriString());
        return subject;
    }

    @PatchMapping("/{id}")
    public Subject updateSubject(@PathVariable Long id,
                                 @RequestParam String name,
                                 @RequestParam String shortName) {
        return this.subjectService.updateSubject(id, name, shortName);
    }

    @DeleteMapping("/{id}")
    public void deleteSubject(@PathVariable Long id) {
        this.subjectService.deleteSubject(id);
    }

    @GetMapping("/professors/{id}")
    public List<Professor> getProfessors(@PathVariable Long id) {
        return this.subjectService.getProfessors(id);
    }

    @PostMapping("/add/professor")
    public void addProfessor(@RequestParam Long subjectId, @RequestParam String professorId) {
        this.subjectService.addProfessorToSubject(subjectId, professorId);
    }

    @PostMapping("/remove/professor")
    public void removeProfessor(@RequestParam Long subjectId, @RequestParam String professorId) {
        this.subjectService.removeProfessorFromSubject(subjectId, professorId);
    }

}
