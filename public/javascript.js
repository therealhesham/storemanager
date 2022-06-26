var $selectstore = $( '#selectstore' ),
		$contractor = $( '#contractor' ),
    $options = $select2.find( 'option' );
    
$selectstore.on( 'change', function() {
	$contractor.html( $options.filter( '[value="' + this.value + '"]' ) );
} ).trigger( 'change' );
