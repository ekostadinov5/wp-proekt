package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.service.SlotsStudentsService;
import mk.ukim.finki.wp.proekt.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/students", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class StudentApi {
    private final StudentService studentService;
    private final SlotsStudentsService slotsStudentsService;

    public StudentApi(StudentService studentService, SlotsStudentsService slotsStudentsService) {
        this.studentService = studentService;
        this.slotsStudentsService = slotsStudentsService;
    }

    @GetMapping("/{index}")
    public Student getStudent(@PathVariable String index) {
        return this.studentService.getStudent(index);
    }

    @PostMapping("/add")
    public void addToSlot(@RequestParam Long slotId, @RequestParam String index) {
        this.slotsStudentsService.add(slotId, index);
    }

    @PostMapping("/remove")
    public void removeFromSlot(@RequestParam Long slotId, @RequestParam String index) {
        this.slotsStudentsService.remove(slotId, index);
    }

    @GetMapping("/bySlotId/{slotId}")
    public Page<Student> getStudentsBySlot(@PathVariable Long slotId,
                                           @RequestHeader(name = "page", defaultValue = "0", required = false) int page,
                                           @RequestHeader(name = "pageSize", defaultValue = "1000", required = false) int pageSize) {
        return this.slotsStudentsService.getStudents(slotId, page, pageSize);
    }

}
