package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.ApplicationUser;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaApplicationUserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/users", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class UserController {
    private final JpaApplicationUserRepository applicationUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(JpaApplicationUserRepository applicationUserRepository,
                          BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/register")
    public void register(@RequestParam String username, @RequestParam String password) {
        ApplicationUser user = new ApplicationUser();
        user.setUsername(username);
        user.setPassword(this.bCryptPasswordEncoder.encode(password));
        this.applicationUserRepository.save(user);
    }

}
