package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.service.ProfessorService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/professors", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ProfessorApi {
    private final ProfessorService professorService;

    public ProfessorApi(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public Page<Professor> getAllProfessors(
            @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
            @RequestHeader(name = "pageSize", defaultValue = "18", required = false) int pageSize) {
        return this.professorService.getAllProfessors(page, pageSize);
    }

    @GetMapping(params = "term")
    public List<Professor> searchProfessors(@RequestParam String term) {
        return this.professorService.searchProfessors(term);
    }

    @GetMapping("/{id}")
    public Professor getProfessor(@PathVariable String id) {
        return this.professorService.getProfessor(id);
    }

}
