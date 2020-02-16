package mk.ukim.finki.wp.proekt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicationUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotEmpty
    private String username;

    @NotEmpty
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

}
