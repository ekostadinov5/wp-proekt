package mk.ukim.finki.wp.proekt.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 1_200_000; // 20 seconds
    public static final long RENEWAL_TIME = 300_000; // 5 minutes
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String ROLE_HEADER = "Role";
    public static final String IDENTIFIER_HEADER = "Identifier";

}
