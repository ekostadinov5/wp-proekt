package mk.ukim.finki.wp.proekt.service;

public interface FollowService {

    void follow(String studentIndex, String professorId);

    void unfollow(String studentIndex, String professorId);

}
