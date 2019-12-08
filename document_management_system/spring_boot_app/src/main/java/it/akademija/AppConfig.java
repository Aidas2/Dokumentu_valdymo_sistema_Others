package it.akademija;


import org.springframework.context.annotation.*;
import org.springframework.data.web.config.PageableHandlerMethodArgumentResolverCustomizer;


@Configuration
public class AppConfig {

    @Bean
    public PageableHandlerMethodArgumentResolverCustomizer customize(){
        return p->p.setOneIndexedParameters(true);
    }

//    @Bean
//    @Scope("prototype")
//    public ProductDTO product() {
//        return new ProductDTO(1, "bike", "www.png", "lorem ipsum", 3, 120.90);
//    }
//
//    @Bean
//    @Scope("prototype")
//    public ProductDTO product2() {
//        return new ProductDTO(2, "ball", "www.png", "lorem ipsum", 30, 2.99);
//    }
//    public static void main(String... strings) {
//        AnnotationConfigApplicationContext context =
//                new AnnotationConfigApplicationContext(AppConfig.class);
//        System.out.println("Spring container started and is ready");
//        ProductDTO p = context.getBean(ProductDTO.class);
//        System.out.println(p);

//    }

}