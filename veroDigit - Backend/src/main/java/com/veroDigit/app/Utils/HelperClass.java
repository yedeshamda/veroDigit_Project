package com.veroDigit.app.Utils;

import java.time.LocalDate;

public class HelperClass {


    public static boolean isDateBetween(LocalDate dateToCheck,LocalDate dateToCheck1, LocalDate startDate, LocalDate endDate) {
        return (dateToCheck.isAfter(startDate) || dateToCheck.isEqual(startDate))
                && (dateToCheck1.isBefore(endDate) || dateToCheck1.isEqual(endDate));
    }
}
