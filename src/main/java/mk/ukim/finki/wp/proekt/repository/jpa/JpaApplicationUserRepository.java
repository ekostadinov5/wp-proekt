package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    ApplicationUser findByUsername(String username);

}
