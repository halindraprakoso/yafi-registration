insert Registration {
    registration_date := datetime_of_statement(),
    registration_note := <optional str>$registrationNote,
    fullname := <str>$fullname,
    nickname := <str>$nickname,
    birth_date := <datetime>$birthDate,
    birth_place := <str>$birthPlace,
    gender := <str>$gender,
    nisn := <optional str>$nisn,
    previous_school := <optional str>$previousSchool,
    province := <str>$province,
    city_or_regency := <str>$cityOrRegency,
    district := <str>$district,
    village := <str>$village,
    postal_code := <str>$postalCode,
    street := <str>$street,
    house_number := <str>$houseNumber,
    address_description := <optional str>$addressDescription,
    mother_fullname := <str>$motherFullname,
    mother_phone := <str>$motherPhone,
    mother_email := <str>$motherEmail, 
    father_fullname := <str>$fatherFullname, 
    father_phone := <str>$fatherPhone, 
    father_email := <str>$fatherEmail,
    grade := <int64>$grade,
    ValueCenter := (
        select ValueCenter
        filter .id = <uuid>$valueCenterId
    ),
    AcademicYear := (
        select AcademicYear
        filter .id = <uuid>$academicYearId
    ),
}