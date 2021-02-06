package ws;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

@Configuration
@EnableWebSocket
public class SpringConfigurer implements WebSocketConfigurer {
  private static final int N1 = 2;
  private static final int N2 = 1024;
  @Bean
  public ServletServerContainerFactoryBean createWebSocketContainer() {
    ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
    container.setMaxTextMessageBufferSize(N1 * N2 * N2);
    return container;
  }
    

  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    SpringWebSocket webSocket = new SpringWebSocket();
    registry.addHandler(webSocket, "Gestion").setAllowedOrigins("*");
  }

}
