package com.roomy.handler;

import com.roomy.handler.exception.CustomApiException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class ApiControllerHandler {

    @ExceptionHandler(CustomApiException.class)
    public void customException(Exception e){

        String exceptionTime = LocalDateTime.now().toString();
        System.out.println(exceptionTime + "예외 발생 : "+ e.getMessage());
    }

}
