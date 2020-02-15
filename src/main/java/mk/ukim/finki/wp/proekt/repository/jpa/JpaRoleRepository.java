package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaRoleRepository extends JpaRepository<Role, Long> {
}
